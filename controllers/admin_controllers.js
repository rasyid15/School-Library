const { response, request } = require('express')
const md5 = require('md5')
const { Op } = require('sequelize')

const modelAdmin = require('../models/index').admin
const query = require('sequelize').Op

exports.getAllAdmin = async(request, response) => {
    let admins = await modelAdmin.findAll()
    return response.json({
        success: true,
        data: admins,
        message: 'All Admin have been loaded'
    })
}

exports.findAdmin = async(request, response) => {
    let keyword = request.body.keyword

    let admins = await modelAdmin.findAll({
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
        data: admins,
        message: 'All Admins have been loaded'
    })
}

exports.addAdmin = (request, response) => {
    let newAdmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5(request.body.password)
    }
    modelAdmin.create(newAdmin)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `New admin has been inserted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.updateAdmin = (request, response) => {

    let dataAdmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5(request.body.password)
    }

    let idAdmin = request.params.id
    modelAdmin.update(dataAdmin, { where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

exports.deleteAdmin = (request, response) => {

    let idAdmin = request.params.id
    modelAdmin.destroy({ where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}