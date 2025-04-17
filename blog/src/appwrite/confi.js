import conf from "../config/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service{
    client = new Client()
    Databases;
   bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwrite)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({title, content, featuredImage, status, userid, postId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                ID.unique(),
                { title, content, featuredImage, status, userid, postId }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error.message);
            throw new Error("Failed to create post. Please try again.");
        }
    }

    async updatePost(ID, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                ID,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error.message);
            throw new Error("Failed to update post. Please try again.");
        }
    }

    async deletePost(ID) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                ID
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error.message);
            throw new Error("Failed to delete post. Please try again.");
        }
    }

    async getPost(ID) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                ID
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error.message);
            throw new Error("Failed to fetch post. Please try again.");
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                queries
            );
            return response.documents;
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error.message);
            throw new Error("Failed to fetch posts. Please try again.");
        }
    }

    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBuckeyId,
                ID.unique(),
                file
            );
            console.log("Appwrite service :: uploadFile :: response", response);
            return response;
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error.message);
            throw new Error("Failed to upload file. Please try again.");
        }
    }

    async deletefile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBuckeyId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletefile :: error", error.message);
            throw new Error("Failed to delete file. Please try again.");
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBuckeyId,
                fileId
            );
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error.message);
            throw new Error("Failed to get file preview. Please try again.");
        }
    }
}

const service = new Service();


export default service
