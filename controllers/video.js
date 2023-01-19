
export const getAllVideos = async (req, res, next) => {
    res.status(200).json({ message: "This is the getAllVideos route" });
};

export const searchVideos = async (req, res, next) => {
    res.status(200).json({ message: "This is the searchVideos route" });
};