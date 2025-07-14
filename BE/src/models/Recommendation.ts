import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'recommendations',
  timestamps: true
})
export class Recommendation extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 18,
      max: 100
    }
  })
  age!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  })
  income!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 10
    }
  })
  dependents!: number;

  @Column({
    type: DataType.ENUM('low', 'medium', 'high'),
    allowNull: false
  })
  riskTolerance!: 'low' | 'medium' | 'high';

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  recommendation!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  explanation!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
} 