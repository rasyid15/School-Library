const { response, request } = require('express')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const member = require('../models/member')

const modelMember = require('../models/index').member

const query = require('sequelize').Op
const upload = require(`./upload_profile`).single(`profile`)

exports.getAllMember = async(request, response) => {

    let members = await modelMember.findAll()
    return response.json({
        success: true,
        data: members,
        message: 'All Members have been loaded'
    })
}

exports.findMember = async(request, response) => {
    let keyword = request.body.keyword

    let members = await modelMember.findAll({
        where: {
            [query.or]: [{
                name: {
                    [Op.substring]: keyword
                }
            }, {
                gender: {
                    [Op.substring]: keyword
                }
            }, {
                address: {
                    [Op.substring]: keyword
                }
            }]
        }
    })
    return response.json({
        success: true,
        keyword: keyword,
        data: members,
        message: 'All Members have been loaded'
    })
}

exports.addMember = (request, response) => {
    upload(request, response, async(error) => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
        let newMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact,
            profile: request.file.filename

        }
        modelMember.create(newMember)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New member has been inserted`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.updateMember = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        let idMember = request.params.id

        let dataMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact
        }
        if (request.file) {
            const selectedMember = await modelMember.findOne({
                where: { id: idMember }
            })
            const oldProfile = selectedMember.profile
            const pathProfile = path.join(__dirname, '../profile', oldProfile)
            if (fs.existsSync(pathProfile)) {
                fs.unlink(pathProfile, error =>
                    console.log(error))
            }
            member.profile = request.file.filename
        }
        modelMember.update(dataMember, { where: { id: idMember } })
            .then(result => {
                return response.json({
                    success: true,
                    message: `Data member has been updated`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })

}

exports.deleteMember = (request, response) => {

    let idMember = request.params.id
    modelMember.destroy({ where: { id: idMember } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data member has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}