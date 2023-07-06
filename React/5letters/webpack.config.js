import { resolve as _resolve } from 'path';

export const entry = './src/index.tsx';
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js', '.scss', '.jsx'],
};
export const output = {
  filename: 'bundle.js',
  path: _resolve(__dirname, 'dist'),
};
