import asyncHandler from 'express-async-handler';
import Link from '../models/linkModel.js';
import User from '../models/userModel.js';

// @desc: Get all links
// @route: GET /api/links
// @access: Private
const getLinks = asyncHandler(async (req, res) => {
  const userLinks = await Link.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  const links = await Link.find().sort({ createdAt: -1 });

  if (req.user.role === 'admin') {
    res.status(200).json(links);
  } else {
    res.status(200).json(userLinks);
  }
});

// @desc: add a new link
// @route: POST /api/links
// @access: Public
const addLink = asyncHandler(async (req, res) => {
  const { title, description, url, type } = req.body;

  if (!title || !description || !url || !type) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const link = await Link.create({
    title,
    description,
    url,
    type,
    user: req.user.id,
  });

  if (link) {
    res.status(201).json(link);
  } else {
    res.status(400);
    throw new Error('Invalid link data');
  }
});

// @desc: get a link
// @route: GET /api/links/:id
// @access: Private
const getLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id);

  if (!link) {
    res.status(400);
    throw new Error('Link not found');
  }

  res.status(200).json(link);
});

// @desc: update a link
// @route: PUT /api/links/:id
// @access: Private
const updateLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id);

  if (!link) {
    res.status(400);
    throw new Error('Link not found');
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // make sure the login user matches the link user
  if (link.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedLink);
});

// @desc: delete a link
// @route: DELETE /api/links/:id
// @access: Private
const deleteLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id);

  if (!link) {
    res.status(400);
    throw new Error('Link not found');
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // make sure the login user matches the link user
  if (link.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await link.deleteOne();

  const { title, id } = link;

  res.status(200).json({ title, id });
});

export { getLinks, addLink, getLink, updateLink, deleteLink };
