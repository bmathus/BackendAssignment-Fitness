import { Model } from 'sequelize';

// Base class for models with optional association handling
export default class DatabaseModel<
  TAttributes,
  TCreationAttributes
> extends Model<TAttributes, TCreationAttributes> {
  static associate?: (models: any) => void;
}
