import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../../appwrite/config";
import { useCallback, useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import Select from "../../shared/Select/Select";
import Input from "../../shared/Input/Input";
import RTE from "../../RTE/RTE";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.userData);
  // console.log(userData);

  const submit = async (data) => {
    console.log(data.image);

    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        await service.deleteFile(post.image);
      }
      if (post.$id) {
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.image = fileId;
        const dbPost = await service.createPosts({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(0, 35);
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const transformedSlug = slugTransform(value.title);
        setValue("slug", transformedSlug);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImg = async () => {
      const fileUrl = await service.getFile(post?.image);
      setImageUrl(fileUrl);
    };
    fetchImg();
  }, [post]);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            type="text"
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              const transformedSlug = slugTransform(e.currentTarget.value);
              setValue("slug", transformedSlug, {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img src={imageUrl} alt={post.title} className="rounded-lg" />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status "
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
