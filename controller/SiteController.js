const BlockModel = require("../model/BlockModel");
const SiteModel = require("../model/SiteModel");

class SiteController {
    // Get all sites
    static async getSites(req, res) {
        try {
            const sites = await SiteModel.getSites();
            const sitePromises = sites.map(async (site) => {
                const blocks = await BlockModel.getBlockBySiteId(site.id); // BlockModel'ı oluşturun
                const blockCount = blocks.length;

                if (blockCount === 1) {
                    site.type = 'Apartment';
                } else if (blockCount > 1) {
                    site.type = 'Site';
                }

                return site;
            });

            const sitesWithType = await Promise.all(sitePromises);
            res.status(200).json({
                status: 200,
                message: 'Sites retrieved successfully',
                data: sitesWithType
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    // Get a single site by ID
    static async getSiteById(req, res) {
        const { id } = req.params;
        try {
            const site = await SiteModel.getSiteById(id);
            if (!site) {
                return res.status(404).json({ status: 404, message: 'Site not found' });
            }

            const blocks = await BlockModel.getBlockBySiteId(id); // BlockModel'ı oluşturun
            const blockCount = blocks.length;

            if (blockCount === 1) {
                site.type = 'Apartment';
            } else if (blockCount > 1) {
                site.type = 'Site';
            } else {
                site.type = 'Site';
            }

            res.status(200).json({
                status: 200,
                message: 'Site retrieved successfully',
                data: site
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    // Create a new site
    static async postSite(req, res) {
        const data = req.body;
        if (!data.site_name || !data.type) {
            return res.status(400).json({ status: 400, message: 'Site name and type are required.' });
        }

        try {
            const success = await SiteModel.saveSite(data);
            if (success) {
                res.status(201).json({
                    status: 201,
                    message: 'Site created successfully',
                    data
                });
            } else {
                res.status(500).json({ status: 500, message: 'Failed to create site.' });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    // Update a site
    static async updateSite(req, res) {
        const { id } = req.params;
        const data = req.body;
        if (!data.site_name || !data.type) {
            return res.status(400).json({ status: 400, message: 'Site name and type are required.' });
        }

        try {
            const site = await SiteModel.getSiteById(id);
            if (!site) {
                return res.status(404).json({ status: 404, message: 'Site with the specified ID not found.' });
            }

            data.updated_at = new Date(); // Güncelleme zamanı

            const success = await SiteModel.updateSite(id, data);
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: 'Site updated successfully',
                    data
                });
            } else {
                res.status(500).json({ status: 500, message: 'Failed to update site.' });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    // Delete a site
    static async deleteSite(req, res) {
        const { id } = req.params;
        try {
            const site = await SiteModel.getSiteById(id);
            if (!site) {
                return res.status(404).json({ status: 404, message: 'Site not found.' });
            }

            const success = await SiteModel.deleteSite(id);
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: 'Site deleted successfully.'
                });
            } else {
                res.status(500).json({ status: 500, message: 'Failed to delete site.' });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }
}

module.exports = SiteController;
