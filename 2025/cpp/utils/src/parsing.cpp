#include "parsing.h"

#include <fstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace aoc::utils {

	std::vector<std::string> readLines(std::string const &filename, bool skipEmpty)
	{
		std::vector<std::string> lines;
		std::ifstream file(filename);

		if (!file)
		{
			throw std::runtime_error("Failed to open file: " + filename);
		}

		std::string line;

		while (std::getline(file, line))
		{
			if (skipEmpty && line.empty())
			{
				continue;
			}
			lines.push_back(line);
		}

		return lines;
	}

} // namespace aoc::utils
