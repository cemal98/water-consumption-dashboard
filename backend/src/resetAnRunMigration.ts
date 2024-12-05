import { AppDataSource } from "./database";

const resetAndRunMigrations = async () => {
  try {
    await AppDataSource.initialize();

    console.log("Veritabanı temizleniyor...");
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.clearDatabase();
    console.log("Veritabanı temizlendi!");

    console.log("Migrationlar çalıştırılıyor...");
    await AppDataSource.runMigrations();

    console.log("Migration işlemleri tamamlandı!");
  } catch (error) {
    console.error("Migration işlemleri sırasında bir hata oluştu:", error);
  } finally {
    await AppDataSource.destroy();
  }
};

resetAndRunMigrations();
