import User from "../Models/Users.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userInfo = await User.findById(id);

    res.status(201).json({
      status: "success",
      data: userInfo,
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const userInfo = await User.findById(id);

    const friendsInfo = await Promise.all(
      userInfo.friends.map((friendId) => User.findById(friendId))
    );

    const formattedFriendsInfo = friendsInfo.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(201).json({
      status: "succes",
      data: formattedFriendsInfo,
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

// UPDATE FRIENDS INFO FOR THE SPECIFIC USER
export const updateUserFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const userInfo = await User.findById(id);
    const friendInfo = await User.findById(friendId);

    // if friend id exists then remove from friends array/list
    if (userInfo.friends.include(friendId)) {
      userInfo.friends = userInfo.freinds.filter((id) => id !== friendId);

      friendInfo.friends = friendInfo.friends.filter(
        (friendId) => friendId !== id
      );
    } else {
      userInfo.friends.push(friendId);
      friendInfo.friends.push(id);
    }

    await userInfo.save();
    await friendInfo.save();

    await this.getUserFriends(req, res);
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};
