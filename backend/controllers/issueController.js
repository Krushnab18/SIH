const Issue = require('../models/Issue');
const User = require('../models/User');
const mongoose = require('mongoose');
const notificationService = require('../services/notificationService');

//  1. Create a new Issue (Citizen reports an issue)
exports.createIssue = async (req, res) => {
    try {
        const { category, description, photoUrl, location } = req.body;

        if (!category || !photoUrl || !location || !location.lat || !location.lng) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newIssue = new Issue({
            reporter: req.user.id,
            category,
            description,
            photoUrl,
            location,
            status: 'Submitted',
        });

        await newIssue.save();

        res.status(201).json({ message: 'Issue reported successfully', issue: newIssue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//  2. Get list of Issues with optional filtering (Admin view)
exports.getIssues = async (req, res) => {
    try {
        const { category, status, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;

        const issues = await Issue.find(query)
            .populate('reporter', 'name email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCount = await Issue.countDocuments(query);

        res.status(200).json({
            issues,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//  3. Get single Issue Detail
exports.getIssueDetail = async (req, res) => {
    try {
        const issueId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(issueId)) {
            return res.status(400).json({ message: 'Invalid Issue ID' });
        }

        const issue = await Issue.findById(issueId).populate('reporter', 'name email');

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(200).json({ issue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//  4. Update Issue Status (Admin only)
exports.updateIssueStatus = async (req, res) => {
    try {
        const issueId = req.params.id;
        const { status } = req.body;

        if (!['Submitted', 'In Progress', 'Resolved'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        if (!mongoose.Types.ObjectId.isValid(issueId)) {
            return res.status(400).json({ message: 'Invalid Issue ID' });
        }

        const issue = await Issue.findById(issueId).populate('reporter');

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        issue.status = status;
        issue.updatedAt = Date.now();
        await issue.save();

        // Send push notification to reporter
        if (issue.reporter.fcmToken) {
            notificationService.sendPushNotification(
                issue.reporter.fcmToken,
                'Issue Status Updated',
                `Your reported issue (${issue.category}) status is now: ${status}`
            );
        }

        res.status(200).json({ message: 'Issue status updated successfully', issue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
