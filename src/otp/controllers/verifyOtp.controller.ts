import { RequestHandler } from "express";
import { verifyOtpService } from "../services/verifyOtp.services";

export const verifyOtp: RequestHandler = async (req, res) => {
  const { email, otp } = req.body;

  const result = await verifyOtpService(email, otp);

  res.json({
    error: null,
    data: result,
  });
};
