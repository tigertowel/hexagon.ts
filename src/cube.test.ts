import { Cube } from "./cube";

test('Sum of cube axis must be 0', () => {
  const cube = Cube.fromAxis(1, 2);
  expect(cube.q).toBe(1);
  expect(cube.r).toBe(2);
  expect(cube.s).toBe(-3);
});

test('Sum of added cube axis must still be 0', () => {
  const a = Cube.fromAxis(1, 2);
  const b = Cube.fromAxis(2, 3);
  const c = a.add(b);
  expect(c.q).toBe(3);
  expect(c.r).toBe(5);
  expect(c.s).toBe(-8);
});

test('Adding inverted cube must leave all axis 0', () => {
  const a = Cube.fromAxis(1, 2);
  const b = a.invert();
  const c = a.add(b);
  expect(c.q).toBe(0);
  expect(c.r).toBe(0);
  expect(c.s).toBe(0);
});