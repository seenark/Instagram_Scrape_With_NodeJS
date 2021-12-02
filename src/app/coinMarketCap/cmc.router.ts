import { Router } from "express";
import { cmcJson } from "./cmc.service";
import axios from "axios";

export const router: Router = Router();

router.get("/cmc/symbol-name", async (req, res) => {
  const link = req.query.link as string;
  const coin = await cmcJson(link);
  const baseUrl = process.env.COIN_HOST || "127.0.0.1";
  const url = `http://${baseUrl}:8000/coin`;
  console.log("🚀 ~ file: cmc.router.ts ~ line 12 ~ router.get ~ url", url);
  const body = {
    symbol: coin.symbol,
    name: coin.name,
  };
  try {
    const { data } = await axios.post(url, body);
    return res.json({ ...coin, data });
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
  return res.json(coin);
});

router.post("/cmc/symbol-name/many", async (req, res) => {
  const baseUrl = process.env.COIN_HOST || "127.0.0.1";
  const url = `http://${baseUrl}:8000/coin`;
  const body = req.body.links as string[];
  body.forEach(async (link) => {
    const coin = await cmcJson(link);
    const body = {
      symbol: coin.symbol,
      name: coin.name,
    };

    const a = await axios.post(url, body);
  });
  return res.json("ok");
});
