import type { Request, Response } from "express";
import * as resourceService from "../services/resource.service.js";
import { HTTP_STATUS } from "../constants/HTTP_STATUS.js";

export const createResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.createResource(req.body);
    res.status(HTTP_STATUS.CREATED).json(resource);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create resource" });
  }
};

export const getAllResources = async (_req: Request, res: Response) => {
  const resources = await resourceService.getAllResources();
  res.status(HTTP_STATUS.OK).json(resources);
};

export const getResourceById = async (req: Request, res: Response) => {

    const {id} = req.params;

    if (!id || typeof id !== "string") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Invalid resource ID" });
  }

  const resource = await resourceService.getResourceById(id);
  if (!resource)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: "Resource not found" });

  res.status(HTTP_STATUS.OK).json(resource);
};


export const updateResource = async (req: Request, res: Response) => {

    const {id} = req.params;

    if (!id || typeof id !== "string") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Invalid resource ID" });
  }

  const updated = await resourceService.updateResource(id,req.body);

  if (!updated)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: "Resource not found" });

  res.status(HTTP_STATUS.OK).json(updated);
};

export const deleteResource = async (req: Request, res: Response) => {

    const {id} = req.params;

    if (!id || typeof id !== "string") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Invalid resource ID" });
  }
  
  const deleted = await resourceService.deleteResource(id);

  if (!deleted)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: "Resource not found" });

  res.status(HTTP_STATUS.NO_CONTENT).send();
};