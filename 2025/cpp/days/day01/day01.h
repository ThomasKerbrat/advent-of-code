#ifndef DAY01_H
#define DAY01_H

#include <string>
#include <vector>

struct Move
{
	char dir;
	int num;
};

std::vector<Move> parseMoves(std::vector<std::string> const &lines)
{
	std::vector<Move> moves;

	for (auto const &line : lines)
	{
		if (line.empty())
		{
			continue;
		}

		char dir = line[0];
		int num = std::stoi(line.substr(1));
		moves.push_back({ dir, num });
	}

	return moves;
}

#endif // DAY01_H
