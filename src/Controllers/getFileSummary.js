const File = require('../Models/File');

const formatSize = (bytes) => {
    if (bytes > 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
    return bytes + ' bytes';
};

const getFilesSummaryByType = async (req, res, fileType) => {
    try {
        const userId = req.user.id || req.user._id;

        const files = await File.find({ user: userId, type: fileType });

        const totalCount = files.length;
        const totalSizeBytes = files.reduce((acc, file) => acc + file.size, 0);

        res.status(200).json({
            type: fileType,
            totalCount,
            totalSize: formatSize(totalSizeBytes),
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message || error });
    }
};

exports.getNotesSummary = (req, res) => getFilesSummaryByType(req, res, "note");
exports.getPdfSummary = (req, res) => getFilesSummaryByType(req, res, "pdf");
exports.getImagesSummary = (req, res) => getFilesSummaryByType(req, res, "image");

exports.getOverallSummary = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;

        const files = await File.find({ user: userId });

        const totalCount = files.length;
        const totalSizeBytes = files.reduce((acc, file) => acc + file.size, 0);

        const totalStorageBytes = 15 * 1024 * 1024 * 1024; // 15 GB
        const used = totalSizeBytes;
        const left = totalStorageBytes - used;

        res.status(200).json({
            totalCount,
            totalSizeUsed: formatSize(used),
            totalSizeLeft: formatSize(left > 0 ? left : 0),
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message || error });
    }
};

exports.getFilesByDate = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: "Date query param is required. Format: YYYY-MM-DD" });
        }

        const selectedDate = new Date(date);
        if (isNaN(selectedDate)) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
        }

        // Start and end of the selected day
        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

        const files = await File.find({
            user: userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        res.status(200).json({ count: files.length, files });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

