export default (req, res) => {
    const videoName = req.query.name
    res.render('player', {
        title: 'Player',
        name: 'Me',
        video: videoName,
        photo: videoName
    })
}