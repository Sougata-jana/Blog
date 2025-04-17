import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, RTE, Select, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../../appwrite/confi";
import { ID } from "appwrite";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
    
                if (file) {
                    console.log("Uploaded file:", file);
                    await service.deletePost(post.featuredImage);
                }
    
                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                    postId: post.postId,
                });
    
                console.log("Updated post response:", dbPost);
    
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    console.error("Failed to update the post.");
                }
            } else {
                if (!data.image || !data.image[0]) {
                    console.error("No file selected for upload.");
                    return;
                }
    
                const file = await service.uploadFile(data.image[0]);
                console.log("Uploaded file:", file);
    
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
    
                    console.log("userData:", userData);
    
                    const dbPost = await service.createPost({
                        ...data,
                        postId: ID.unique(),
                        userid: userData.$id,
                    });
    
                    console.log("Created post response:", dbPost);
    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        console.error("Failed to create the post.");
                    }
                } else {
                    console.error("File upload failed.");
                }
            }
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true, name: "title" })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true, name: "slug" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")}  />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post, name: "image" })}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        {console.log("Featured Image ID:", post?.featuredImage)}
                        {console.log("Preview URL:", service.getFilePreview(post?.featuredImage))}
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                            onError={(e) => {
                                console.error("Image failed to load. File ID:", post.featuredImage, "Error:", e);
                                e.currentTarget.src = "/fallback-image.jpg"; // Ensure this path is valid
                            }}
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true, name: "status" })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full bg-gray-900">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
