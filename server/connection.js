import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      "connection established with database -> " +
        "https://cloud.mongodb.com/v2/65a343ba1fcdc35ed09d06bc#/metrics/replicaSet/65a344034723c010475e8db5/explorer"
    );
  } catch (error) {
    console.log("Error occured while connecting with database -> ", error);
  }
};
