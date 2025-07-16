const Project = require("../models/Project");

// @desc    Get all projects
// @desc    Get all projects with pagination, search, and sorting
exports.getProjects = async (req, res) => {
  try {
    console.log('Query params:', req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const sortField =  "createdAt";
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    // Search in title or description
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = new Project({ title, description, status });
    const created = await project.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title || project.title;
    project.description = description || project.description;
    project.status = status || project.status;

    const updated = await project.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
