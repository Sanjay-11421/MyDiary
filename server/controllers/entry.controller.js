import EntryModel from "../models/entry.model.js";

export const create = async (req, res) => {
  const { id } = req.user;
  const { title, content } = req.body;
  const entry = new EntryModel({ userId: id, title, content });
  await entry.save();
  res.json({ msg: "Entry Successfull" });
};

export const get = async (req, res) => {
  const { id } = req.user;
  const entries = await EntryModel.find({ userId: id });
  res.json(entries);
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const entry = await EntryModel.findOne({ _id: id, userId: req.user.id });

  if (!entry)
    return res.status(404).json({ msg: "Entry not found or Unauthorized" });
  res.json(entry);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  const entry = await EntryModel.findOneAndDelete({
    _id: id,
    userId: req.user.id,
  });
  if (!entry)
    return res.status(404).json({ msg: "Entry not found or Unauthorized" });

  res.json({ msg: "Deleted Successfully" });
};
