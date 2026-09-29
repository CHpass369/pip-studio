import express from 'express';
import path from 'path';

export const share_assets = (app: any) => {
  app.use(express.static(path.join(__dirname, '/../../../assets')));
  return app;
};
