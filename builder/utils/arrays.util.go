package utils

func Reduce[T interface{}, R interface{}](arr []T, reducerFunc func(acc R, curr T) R, initialValue R) R {
	acc := initialValue

	for _, v := range arr {
		acc = reducerFunc(acc, v)
	}

	return acc
}

func Map[T interface{}, R interface{}](arr []T, mapFunc func(el T) (R, error)) ([]R, error) {
	acc := []R{}

	for _, v := range arr {
		newValue, err := mapFunc(v)

		if err != nil {
			return acc, err
		}

		acc = append(acc, newValue)
	}

	return acc, nil
}
