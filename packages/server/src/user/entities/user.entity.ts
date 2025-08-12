import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  head_img: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  open_id: string;
}
