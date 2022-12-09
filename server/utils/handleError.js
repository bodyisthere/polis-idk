export function handleError(res, message) {
    return res.status(500).json({
        message,
    })
}