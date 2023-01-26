const Jimp = require("jimp");
const path = require("path");
const UserDto = require("../dtos/user-dto");
const userService = require("../services/user-service");

class ActivateController {
  /**Activating user */
  async activate(req, res) {
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required" });
    }

    /**Updating user */
    const userId = req.user._id; //We have attached userdata to req object in middleware
    try {
      const user = await userService.findUser({ _id: userId });
      if (!user) {
        res.status(404).json({ message: "User Not found" });
      }
      user.activated = true;
      user.name = name;
      user.avatar = avatar;
      await user.save();
      res.json({ user: new UserDto(user), auth: true });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
module.exports = new ActivateController();
