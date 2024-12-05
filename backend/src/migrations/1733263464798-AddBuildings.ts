import moment from "moment";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class AddBuildings1733263464798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const buildings = [
      {
        id: uuidv4(),
        name: 'Building 1',
        location: 'Location 1',
      },
      {
        id: uuidv4(),
        name: 'Building 2',
        location: 'Location 2',
      },
      {
        id: uuidv4(),
        name: 'Building 3',
        location: 'Location 3',
      },
    ];

    const today = moment();
    const startDate = moment().subtract(6, 'months');

    const dailyData = [];
    for (let building of buildings) {
      let currentDate = startDate.clone();
      while (currentDate.isSameOrBefore(today)) {
        dailyData.push({
          id: building.id,
          name: building.name,
          location: building.location,
          date: currentDate.format('YYYY-MM-DD'),
          consumption: Math.floor(Math.random() * 500) + 100,
        });
        currentDate.add(1, 'day');
      }
    }

    await queryRunner.manager.insert('building', dailyData);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('building', {});
  }
}
