import mongoose from "mongoose";
import Ideas from "../models/ideas.model.js";

export const getAllIdeas = async (req, res) => {
  try {
    const allIdeas = await Ideas.find();

    if (!allIdeas || allIdeas.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No ideas exist", data: [] });
    }

    const formattedIdeas = allIdeas.map((idea) => ({
      id: idea._id.toString(),
      title: idea.title,
      description: idea.description,
      tags: idea.tags,
      techStack: idea.techStack,
      status: idea.status,
      createdAt: idea.createdAt,
      updatedAt: idea.updatedAt,
    }));

    res.status(200).json({ success: true, data: formattedIdeas });
  } catch (err) {
    console.error("Error fetching ideas:", err);
    res.status(500).send("Internal Server error, unable to fetch ideas");
  }
};

export const getIdeaById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid idea ID");
    }

    const idea = await Ideas.findById(id);
    if (!idea) {
      return res.status(404).send("Idea not found");
    }
    res.status(200).json({ message: "Idea fetched successfully", data: idea });
  } catch (err) {
    console.error("Error fetching idea by ID:", err);
    res.status(500).send("Internal Server error, unable to get idea");
  }
};

export const postIdea = async (req, res) => {
  try {
    const { title, description, techStack, tags } = req.body;
    if (!title || !description || !techStack || !tags) {
      return res.status(400).send("Some fields are missing");
    }

    const idea = new Ideas({
      title,
      description,
      techStack,
      tags,
      Votes: 0,
    });

    await idea.save();
    return res.status(201).json({ message: "Idea posted successfully" });
  } catch (err) {
    console.error("Error posting idea:", err);
    res.status(500).send("Idea can't be posted");
  }
};

export const updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, tags } = req.body;

    if (!id || !title || !description || !techStack || !tags) {
      return res.status(400).send("Some fields are missing");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid idea ID");
    }

    const updatedData = {
      title,
      description,
      techStack,
      tags,
    };

    const options = {
      new: true,
      runValidators: true,
    };

    const idea = await Ideas.findByIdAndUpdate(id, updatedData, options);

    if (!idea) {
      return res.status(404).send("Idea not found or can't be updated");
    }
    return res.status(200).json({ message: "Idea updated successfully" });
  } catch (error) {
    console.error("Error updating idea:", error);
    return res.status(500).send("Unable to update idea");
  }
};

export const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid idea ID" });
    }

    const deletedIdea = await Ideas.findByIdAndDelete(id);

    if (!deletedIdea) {
      return res.status(404).json({ error: "Idea not found" });
    }

    return res.status(200).json({ message: "Idea deleted successfully" });
  } catch (err) {
    console.error("Error deleting idea:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
