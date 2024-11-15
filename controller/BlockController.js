const BlockModel = require("../model/BlockModel");

class BlockController {
    static async getBlocks(req, res) {
        try {
            const blocks = await BlockModel.getBlocks();
            res.status(200).json({
                status: 200,
                message: 'Blocks retrieved successfully',
                data: blocks,
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async getBlockById(req, res) {
        const { id } = req.params;
        try {
            const block = await BlockModel.getBlockById(id);
            if (!block) {
                return res.status(404).json({ status: 404, message: 'Block not found' });
            }
            res.status(200).json({
                status: 200,
                message: 'Block retrieved successfully',
                data: block,
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async getBlocksBySiteId(req, res) {
        const { siteId } = req.params;
        try {
            const blocks = await BlockModel.getBlockBySiteId(siteId);
            if (!blocks || blocks.length === 0) {
                return res.status(404).json({ status: 404, message: 'No blocks found for the specified site ID' });
            }
            res.status(200).json({
                status: 200,
                message: 'Blocks retrieved successfully',
                data: blocks,
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async postBlock(req, res) {
        const data = req.body;
        if (!data.site_id || !data.block_name) {
            return res.status(400).json({ status: 400, message: 'Site ID and Block Name are required.' });
        }
        try {
            const success = await BlockModel.saveBlock(data);
            if (success) {
                res.status(201).json({
                    status: 201,
                    message: 'Block created successfully',
                    data,
                });
            } else {
                res.status(500).json({ status: 500, message: 'Failed to create block.' });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async updateBlock(req, res) {
        const { id } = req.params;
        const data = req.body;
        if (!data.site_id || !data.block_name) {
            return res.status(400).json({ status: 400, message: 'Site ID and Block Name are required.' });
        }
        try {
            const block = await BlockModel.getBlockById(id);
            if (!block) {
                return res.status(404).json({ status: 404, message: 'Block not found' });
            }
            const success = await BlockModel.updateBlock(id, data);
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: 'Block updated successfully',
                    data,
                });
            } else {
                res.status(500).json({ status: 500, message: 'Failed to update block.' });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async deleteBlock(req, res) {
        const { id } = req.params;
        try {
            const block = await BlockModel.getBlockById(id);
            if (!block) {
                return res.status(404).json({ status: 404, message: 'Block not found' });
            }
            const success = await BlockModel.deleteBlock(id);
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: 'Block deleted successfully',
                });
            } else {
                res.status(500).json({ status: 500, message: 'Failed to delete block.' });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }
}

module.exports = BlockController;
