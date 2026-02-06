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
		int step = (move.dir == 'L' ? -1 : 1);

		for (int i = 0; i < move.num; i++)
		{
			dial += step;
			if ((dial % MOD) == 0)
			{
				password++;
			}
		}
	}

	std::cout << password << std::endl;
	return 0;
}
