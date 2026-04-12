app.get("/metrics", async (req, res) => {
    try {
        const data = await Metrics.findOne().sort({ updatedAt: -1 });

        if (!data) {
            return res.json({
                health: 95,
                flow: 100,
                load: 40,
                network: 120,
                demand: 70
            });
        }

        res.json(data);

    } catch (error) {
        console.log("Metrics Error:", error.message);

        // Always return fallback instead of crashing
        res.status(200).json({
            health: 95,
            flow: 100,
            load: 40,
            network: 120,
            demand: 70
        });
    }
});