import { ApiProperty } from '@nestjs/swagger';
import { Listing } from '@prisma/client';
import { IsInt, IsString } from 'class-validator';

export class CreateListingDto implements Listing {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  @IsString()
  imageSrc: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsInt()
  roomCount: number;

  @ApiProperty()
  @IsInt()
  bathroomCount: number;

  @ApiProperty()
  @IsInt()
  guestCount: number;

  @ApiProperty()
  @IsString()
  locationValue: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty({ required: false })
  @IsString()
  userId: string;
}
