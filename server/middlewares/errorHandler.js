export const errorHandler = (err, req, res, next) => {
  try {
    console.log("Glocal express error handler executed");
    // process.exit(1);
    res.status(500).json({
      error: err,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
