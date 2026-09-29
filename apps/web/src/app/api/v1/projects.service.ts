import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Project } from 'app/models/project.model';

const PATH_V1 = `${BASE_PATH.APP}/v1/projects`;

const get_by_id = common.get_by_id<Project>(PATH_V1);
const find = common.find<Project>(PATH_V1);
const find_by = common.find_by<Project>(PATH_V1);
const create = common.create<Project>(PATH_V1);
const update = common.update<Project>(PATH_V1);
const remove = common.remove<Project>(PATH_V1);

export default {
  get_by_id,
  find,
  find_by,
  create,
  update,
  remove,
};
