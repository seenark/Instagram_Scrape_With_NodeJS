import { Router } from "express";
import { instagramJSON } from "./instagram.service";

export const router: Router = Router();

router.get("/instagram/byName/:igName", async (req, res) => {
  const igName = req.params.igName;
  const url = `https://www.instagram.com/${igName}/?__a=1`;
  const data = await instagramJSON(url);
  const json = JSON.parse(data);
  res.json(json);
});

router.get("/instagram/byPost/:postId", async (req, res) => {
  const postId = req.params.postId;
  const url = `https://www.instagram.com/p/${postId}/?__a=1`;
  const data = await instagramJSON(url);
  const json = JSON.parse(data);
  res.json(json);
});

router.get("/instagram/nextMediaTimeline", async (req, res) => {
  const userId = req.query.userId;
  const numberOfPosts = req.query.numberOfPosts || 12;
  const endCursor = req.query.endCursor;
  const url = `https://instagram.com/graphql/query/?query_id=17888483320059182&id=${userId}&first=${numberOfPosts}&after=${endCursor}`;
  const data = await instagramJSON(url);
  const json = JSON.parse(data);
  res.json(json);
});
