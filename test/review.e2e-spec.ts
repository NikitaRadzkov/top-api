import { CreateReviewDto } from './../src/review/dto/create-review.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Test name',
  title: 'Test title',
  description: 'Test description',
  rating: 5.0,
  productId,
  typegooseName: 'test',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createId = body._id;
        expect(createId).toBeDefined();
        done();
      });
  });

  it('/review/byProduct/:productId (GET)', async (done) => {
    return request(app.getHttpServer())
      .get('/review/byProduct' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        done();
      });
  });

  it('/review/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/review/' + createId)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
