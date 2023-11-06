// Importing necessary decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';


// Define the NewsEntity class as an entity
@Entity()
export class NewsEntity {
  // Define the primary key column using the PrimaryGeneratedColumn decorator
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id : string;

  @Column({ type: "varchar" })
  @IsString()
  @IsNotEmpty()
  newsAgency: string;

  @Column({ type: "varchar" })
  @IsString()
  @IsNotEmpty()
  newsHeadline: string;

  @Column({ type: "varchar" })
  @IsString()
  @IsNotEmpty()
  newsText: string;

  @Column({ type: "varchar" })
  @IsString()
  @IsNotEmpty()
  agencyName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
   @IsDate()
  date: Date;
};