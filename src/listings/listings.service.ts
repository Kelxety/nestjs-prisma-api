import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}
  create(createListingDto: CreateListingDto) {
    return this.prisma.listing.create({ data: createListingDto });
  }

  findAll() {
    return this.prisma.listing.findMany({ include: { user: true } });
  }

  findOne(id: string) {
    return this.prisma.listing.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  remove(id: string) {
    return this.prisma.listing.delete({ where: { id } });
  }
}
