import {getRules} from "../helpers/utils";
import {calculate} from "../core/algorithm";

describe("Algorithm", () => {
  describe("when simple data", () => {
    describe("should handle AND with single conclusion", () => {
      let expertSystem;

      beforeEach(() => {
        expertSystem = getRules("./src/assets/rules/simple/and-single-conclusion.txt");
      });

      test("? + true => true", () => {
        expertSystem.facts = {
          A: null,
          B: true,
          C: true,
        };
        const query = "A";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("false + ? => true ", () => {
        expertSystem.facts = {
          A: false,
          B: null,
          C: true,
        };
        const query = "B";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("false + false => ?", () => {
        expertSystem.facts = {
          A: false,
          B: false,
          C: null,
        };
        const query = "C";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });
    });

    describe("should handle AND with single condition", () => {
      let expertSystem;

      beforeEach(() => {
        expertSystem = getRules("./src/assets/rules/simple/and-single-condition.txt");
      });

      test("? => true + true", () => {
        expertSystem.facts = {
          A: null,
          B: true,
          C: true,
        };
        const query = "A";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("? => true + false", () => {
        expertSystem.facts = {
          A: null,
          B: true,
          C: true,
        };
        const query = "A";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("? => false + true", () => {
        expertSystem.facts = {
          A: null,
          B: false,
          C: true,
        };
        const query = "A";
        expect(calculate(query, expertSystem)).toBeFalsy();
      });

      test("? => false + false", () => {
        expertSystem.facts = {
          A: null,
          B: false,
          C: false,
        };
        const query = "A";
        expect(calculate(query, expertSystem)).toBeFalsy();
      });

      test("true => ? + true", () => {
        expertSystem.facts = {
          A: true,
          B: null,
          C: true,
        };
        const query = "B";
        expect(calculate(query, expertSystem)).toBeTruthy();
      });

      test("true => ? + false", () => {
        expertSystem.facts = {
          A: true,
          B: null,
          C: false,
        };
        const query = "B";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("false => ? + true", () => {
        expertSystem.facts = {
          A: false,
          B: null,
          C: true,
        };
        const query = "B";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("false => ? + false", () => {
        expertSystem.facts = {
          A: false,
          B: null,
          C: false,
        };
        const query = "B";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("true => true + ?", () => {
        expertSystem.facts = {
          A: true,
          B: true,
          C: null,
        };
        const query = "C";
        expect(calculate(query, expertSystem)).toBeTruthy();
      });

      test("true => false + ?", () => {
        expertSystem.facts = {
          A: true,
          B: false,
          C: null,
        };
        const query = "C";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("false => true + ?", () => {
        expertSystem.facts = {
          A: false,
          B: true,
          C: null,
        };
        const query = "C";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("false => false + ?", () => {
        expertSystem.facts = {
          A: false,
          B: false,
          C: null,
        };
        const query = "C";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });
    });

    describe("should handle AND with both: conclusion and condition", () => {
      let expertSystem;

      beforeEach(() => {
        expertSystem = getRules("./src/assets/rules/simple/and-both.txt");
      });

      test("? + true => false + true", () => {
        expertSystem.facts = {
          A: null,
          B: true,
          C: false,
          D: true,
        };
        const query = "A";
        expect(calculate(query, expertSystem)).toBeFalsy();
      });

      test("true + ? => false + false", () => {
        expertSystem.facts = {
          A: true,
          B: null,
          C: false,
          D: false,
        };
        const query = "B";
        expect(calculate(query, expertSystem)).toBeFalsy();
      });

      test("false + true => ? + true", () => {
        expertSystem.facts = {
          A: false,
          B: true,
          C: null,
          D: true,
        };
        const query = "C";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });

      test("false + false => false + ?", () => {
        expertSystem.facts = {
          A: false,
          B: false,
          C: false,
          D: null,
        };
        const query = "D";
        expect(calculate(query, expertSystem)).toEqual("undetermined");
      });
    });

    describe("should handle AND with condition and NOT", () => {
      let expertSystem;

      beforeEach(() => {
        expertSystem = getRules("./src/assets/rules/simple/and-single-condition-with-not.txt");
      });

      test("? => false + !false", () => {
        expertSystem.facts = {
          A: null,
          B: false,
          C: false,
        };
        const query = "A";
        expect(calculate(query, expertSystem)).toBeFalsy();
      });
    });
  });
});
