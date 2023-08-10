import { ApiProperty } from '@nestjs/swagger';
import { Listing } from '@prisma/client';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class ListingEntity implements Listing {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  @IsString()
  imageSrc: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  roomCount: number;

  @ApiProperty()
  @IsInt()
  bathroomCount: number;

  @ApiProperty()
  @IsNumber()
  guestCount: number;

  @ApiProperty()
  @IsString()
  locationValue: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false, nullable: true })
  userId: string | null;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity | null;

  constructor({ user, ...data }: Partial<ListingEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
