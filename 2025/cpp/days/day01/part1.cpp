#include "day01.h"

#include "../../utils/include/parsing.h"

#include <iostream>
#include <string>
#include <vector>

int main()
{
	constexpr int MOD = 100;
	auto lines = aoc::utils::readLines("../inputs/day01.txt");
	auto moves = parseMoves(lines);

	int dial = 50;
	int password = 0;

	for (auto const &move : moves)
	{
		dial = dial + (move.dir == 'L' ? -move.num : move.num);

		if ((dial % MOD) == 0)
		{
			password++;
		}
	}

	std::cout << password << std::endl;
	return 0;
}
