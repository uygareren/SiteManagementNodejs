const FlatModel = require("../model/FlatModel");

class FlatController {
    static async getAllFlats(req, res) {
        try {
            const flats = await FlatModel.getAllFlats();
            res.status(200).json({
                status: 200,
                message: "Flats retrieved successfully",
                data: flats,
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async getFlatById(req, res) {
        const { id } = req.params;
        try {
            const flat = await FlatModel.getFlatById(id);
            if (!flat) {
                return res.status(404).json({ status: 404, message: "Flat not found" });
            }
            res.status(200).json({
                status: 200,
                message: "Flat retrieved successfully",
                data: flat,
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async getFlatsByBlockId(req, res) {
        const { block_id } = req.params;
        try {
            const flats = await FlatModel.getFlatsByBlockId(block_id);
            if (!flats.length) {
                return res
                    .status(404)
                    .json({ status: 404, message: "No flats found for the given block_id" });
            }
            res.status(200).json({
                status: 200,
                message: `Flats retrieved successfully for block_id ${block_id}`,
                data: flats,
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async postFlat(req, res) {
        const data = req.body;

        if (!data.block_id || !data.flat_no || !data.room_number) {
            return res.status(400).json({
                status: 400,
                message: "Block ID, Flat Number, and Room Number are required.",
            });
        }

        try {
            const existingFlat = await FlatModel.getFlatByBlockAndFlatNo(
                data.block_id,
                data.flat_no
            );

            if (existingFlat) {
                return res.status(409).json({
                    status: 409,
                    message: "Flat with the same block_id and flat_no already exists.",
                });
            }

            const success = await FlatModel.saveFlat(data);
            if (success) {
                res.status(201).json({
                    status: 201,
                    message: "Flat created successfully",
                    data,
                });
            } else {
                res.status(500).json({ status: 500, message: "Failed to create flat." });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async updateFlat(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const flat = await FlatModel.getFlatById(id);
            if (!flat) {
                return res.status(404).json({ status: 404, message: "Flat not found." });
            }

            const success = await FlatModel.updateFlat(id, data);
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: "Flat updated successfully.",
                    data,
                });
            } else {
                res.status(500).json({ status: 500, message: "Failed to update flat." });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }

    static async getFlatsByDateAndRoom(req, res) {
        const { start_date, end_date, min_rooms, max_rooms } = req.query;
        let query = "SELECT * FROM Flats WHERE 1=1";  
        let queryParams = [];
    
        if (min_rooms) {
            query += " AND room_number >= ?";
            queryParams.push(parseInt(min_rooms));
        }
    
        if (max_rooms) {
            query += " AND room_number <= ?";
            queryParams.push(parseInt(max_rooms));
        }
    
        if (start_date && end_date) {
            query += " AND created_at BETWEEN ? AND ?";
            queryParams.push(new Date(start_date));
            queryParams.push(new Date(end_date));
        }
    
        if (!queryParams.length) {
            return res.status(400).json({
                status: 400,
                message: "Please provide at least one filter parameter.",
            });
        }
    
        try {
            const pool = await sql.connect(db);
            const result = await pool.request()
                .query(query, ...queryParams);
    
            const flats = result.recordset;
    
            if (!flats.length) {
                return res.status(404).json({
                    status: 404,
                    message: "No flats found with the given filters.",
                });
            }
    
            res.status(200).json({
                status: 200,
                message: "Flats retrieved successfully",
                data: flats,
            });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ status: 500, message: error.message });
        }
    }
    
    static async deleteFlat(req, res) {
        const { id } = req.params;
        try {
            const flat = await FlatModel.getFlatById(id);
            if (!flat) {
                return res.status(404).json({ status: 404, message: "Flat not found." });
            }

            const success = await FlatModel.deleteFlat(id);
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: "Flat deleted successfully.",
                });
            } else {
                res.status(500).json({ status: 500, message: "Failed to delete flat." });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }
}

module.exports = FlatController;
