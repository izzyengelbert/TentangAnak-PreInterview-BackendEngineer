'use strict';

module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    filename: DataTypes.STRING,
    buffer: DataTypes.BLOB,
    mimetype: DataTypes.STRING
  }, {
    tableName: 'files',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  File.associate = function(models) {
    // associations can be defined here
  };

  File.createNewFile = async function(newFile, baseHost, transaction) {
    const file = new File({
      filename: newFile.originalname,
      buffer: newFile.buffer,
      mimetype: newFile.mimetype
    });
    await file.save({ transaction });
    file.filepath = `${baseHost}/files/${file.id}`;
    delete file.buffer;
    return file;
  }

  File.findFileById = function(id) {
    return File.findOne({
      where: { id }
    });
  }


  File.updateFileById = async function(id, newFile) {
    const file = await File.findOne({
      where: { id }
    });
    file.filename = newFile.originalname;
    file.buffer = new Blob([newFile.buffer], { type: newFile.mimetype });
    file.mimetype = newFile.mimetype;
    await file.save();
    file.filepath = `${this._app.locals.baseHost}/files/${file.id}`;
    delete file.buffer;
    return file;
  }

  return File;
};