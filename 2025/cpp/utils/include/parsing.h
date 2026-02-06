#ifndef UTILS_PARSING_H
#define UTILS_PARSING_H

#include <string>
#include <vector>

namespace aoc::utils {

	std::vector<std::string> readLines(std::string const &filename, bool skipEmpty = true);

} // namespace aoc::utils

#endif
