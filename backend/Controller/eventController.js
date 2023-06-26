const ObjectId = require("bson").ObjectId;
const Event = require("../Model/eventModel");

const getEvents = async (req, res) => {
  try {
    // console.log(new Date(new Date().getFullYear() - 1, 0, 1));
    // console.log(new Date(new Date().getFullYear() + 2, 0, 1).toISOString());
    // const data = await Event.find({ user: id }).populate("user").exec();
    console.log(req.user.id);
    const id = new ObjectId(req.user.id);
    // consulta en mongoose para obtener los eventos del año anterior, actual y siguiente
    const data = await Event.find({
      user: id,
      start: {
        $gt: new Date(new Date().getFullYear() - 1, 0, 1),
        $lte: new Date(new Date().getFullYear() + 2, 0, 1),
      },
    })
      .populate("user")
      .exec();

    res.status(200).json({
      status: "succeeded",
      data,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, start, end, allDay } = req.body;
    const user = new ObjectId(req.user.id);
    const newEvent = new Event({
      title,
      start,
      end,
      allDay,
      user,
    });
    const event = await newEvent.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    // si no existe el evento
    if (!event) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Event not found",
      });
    }

    // si el usuario no es el mismo que creó el evento
    if (event.user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json("You don't have permission to edit this event");
    }
    // actualizar mediante findByIdAndUpdate
    const data = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "succeeded",
      data,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json("You don't have permission to delete this event");
    }
    await event.remove();
    res.status(200).json({
      status: "succeeded",
      data: null,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
