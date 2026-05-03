export const errorHandling = (err, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: "Erro na execução",
        error: err.message
    });
};
//# sourceMappingURL=errorHandler.js.map