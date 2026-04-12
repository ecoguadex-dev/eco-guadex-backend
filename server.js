app.get("/metrics", (req, res) => {
    res.json({
        health: 95,
        flow: 100,
        load: 40,
        network: 120,
        demand: 70
    });
});