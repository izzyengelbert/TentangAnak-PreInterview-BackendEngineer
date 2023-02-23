import NotFoundError from '../../errors/common/NotFoundError';

const ENTITY = 'File';

export default class FileService {
  constructor(models) {
    this._File = models[ENTITY];
  }

  getAllFiles() {
    return this._File.findAll({
      attributes: { exclude: ['buffer'] }
    });
  }

  getFileById(id) {
    return this._findFileById(id);
  }

  deleteFileById(id) {
    return this._File.destroy({ where: { id } });;
  }

  updateFileById(id, payload) {
    return this._File.updateFileById(id, payload);
  }

  createFile(payload, transaction) {
    return this._File.createNewFile(payload, transaction);
  }

  async _findFileById(id) {
    const file = await this._File.findFileById(id);
    if (!file) {
      throw new NotFoundError(ENTITY);
    }
    return file;
  }
}
