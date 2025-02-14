const express = require('express')
const { getNote, createNote, updateNote } = require('../controllers/noteController')

const router = express.Router()

router.get("/:name", getNote)
router.post("/:name", createNote)
router.put("/:name", updateNote)

module.exports = router